"use server"

import getToken from "@/src/auth/token"
import { Budget, DraftExpenseSchema, ErrorResponseSchema, Expense, LoginSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type BudgetAndExpenseId = {
    budgetId: Budget['id'],
    expenseId: Expense['id']
}

type ActionStateType = {
    errors: string[],
    success: string
}


export async function editExpense({budgetId, expenseId} : BudgetAndExpenseId ,prevState: ActionStateType , formData : FormData){
   const expenseData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const expense = DraftExpenseSchema.safeParse(expenseData)

    if (!expense.success) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const token = await getToken()

    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`

    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount,
        })
    })

    const json = await req.json()

    if(!req.ok){
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)
    revalidatePath(`/admin/budgets/${budgetId}`)

    return {
        errors: [],
        success
    }
}