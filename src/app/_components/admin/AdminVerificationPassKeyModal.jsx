/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { decryptKey, encryptKey } from '../../lib/utils';


const AdminVerificationPassKeyModal = () => {
  
  const router = useRouter();

  const [openModal, setOpenModal] = useState(true);

  const [passKeyInput, setPassKeyInput] = useState('');

  const [passKeyError, setPassKeyError] = useState('');

  const pathname = usePathname();

  const closeModalAndRemoveIsAdminParamFromURL = () => {

    setOpenModal(false);

    router.push('/');

  };

  const getEncryptedKeyFromLocalStorage = typeof window !== 'undefined' ? window.localStorage.getItem('accessPassKey') : null;

  const getEncryptedKeyFromSessionCookies =  Cookies.get('accessPassKeyCookie');


  useEffect(() => {
    
    if (getEncryptedKeyFromLocalStorage && getEncryptedKeyFromSessionCookies) {

      const decryptAccessKeyLocalStorage = decryptKey(getEncryptedKeyFromLocalStorage);
    
      const decryptAccessKeySessionCookies = decryptKey(getEncryptedKeyFromSessionCookies);

      if (pathname) {

        if (decryptAccessKeyLocalStorage === process.env.NEXT_PUBLIC_ADMIN_PASS_KEY.toString() && decryptAccessKeySessionCookies === process.env.NEXT_PUBLIC_ADMIN_PASS_KEY.toString()) {
  
          setOpenModal(false);
  
          router.push('/admin');
  
        }
  
      }

    }

  }, [getEncryptedKeyFromLocalStorage, getEncryptedKeyFromSessionCookies]);


  const validatePassKey = (e) => {

    e.preventDefault();

    if (!passKeyInput) {

      setPassKeyError('Please enter a passkey');

    } else if (passKeyInput === process.env.NEXT_PUBLIC_ADMIN_PASS_KEY) {

      setPassKeyError('');

      const encryptPassKey = encryptKey(passKeyInput);

      localStorage.setItem('accessPassKey', encryptPassKey); 

      Cookies.set('accessPassKeyCookie', encryptPassKey, { path: '/' });

      setOpenModal(false);

    } else {

      setPassKeyError('Invalid Pass Key. Please try again.');

    }

  };

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={closeModalAndRemoveIsAdminParamFromURL}
              className="cursor-pointer"
            />
          </AlertDialogTitle>

          <AlertDialogDescription>
            Please enter the pass key to access the Admin Page.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP
            maxLength={6}
            value={passKeyInput}
            onChange={(value) => setPassKeyInput(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {passKeyError && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {passKeyError}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePassKey(e)}
            className="shad-primary-btn w-full"
          >
            Verify Pass Key
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminVerificationPassKeyModal;
