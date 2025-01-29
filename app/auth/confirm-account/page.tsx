import ConfirmAccountForm from '@/components/auth/ConfirmAccountForm';
import React from 'react'

export default function ConfirAccountPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        Confirma tu Cuenta
      </h1>
      <p className="text-3xl font-bold">
        Ingresa el código que recibiste por <span className="text-amber-500">Email</span>
      </p>
        <ConfirmAccountForm/>
    </>
  );
}
