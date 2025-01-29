"use client"
import React, { useActionState, useEffect } from 'react'
import BudgetForm from './BudgetForm'
import { Budget } from '@/src/schemas'
import { editBudget } from '@/actions/edit-budget-action'
import ErrorMessage from '../ui/ErrorMessage'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function EditBudgetForm({ budget }: { budget: Budget }) {

    const editBudgetWithId = editBudget.bind(null, budget.id)
    const router = useRouter()
    const [state, dispatch] = useActionState(editBudgetWithId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            router.push('/admin')
        }
    }, [state])

    return (
        <>
            <form className="mt-10 space-y-3" noValidate action={dispatch}>
                {state.errors.map(e => <ErrorMessage key={e}>{e}</ErrorMessage>)}
                <BudgetForm budget={budget} />
                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value="Guardar Cambios"
                />
            </form>
        </>
    )
}
