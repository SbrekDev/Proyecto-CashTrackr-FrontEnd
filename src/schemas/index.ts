import {z} from 'zod'

export const RegisterSchema = z.object({
    email: z.string().min(1, {message: 'El email es obligatorio'}).email({message: 'Email no valido'}),
    name: z.string().min(1, { message: 'Tu nombre no puede estar vacío' }),
    password: z.string().min(2, { message: 'Tu clave no puede ser inferior a 8 caracteres' }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Las claves no son iguales',
    path: ['password_confirmation']
})

export const LoginSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
    password: z.string()
        .min(1, { message: 'El Password no puede ir vacio' })
})
export const TokenSchema = z.string({ message: 'Token no válido' }).length(6, { message: 'Token no válido' })

export const ForgotPasswordSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
})

export const ResetPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: 'El Password debe ser de al menos 6 caracteres' }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

export const DraftBudgetSchema = z.object({
    name: z.string()
        .min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
    amount: z.coerce.
        number({ message: 'Cantidad no válida' })
        .min(1, { message: 'Cantidad no válida' }),
})

export const SuccessSchema = z.string()
export const ErrorResponseSchema = z.object({
    error: z.string()
})

export const PasswordValidationSchema = z.string().min(1, { message: 'El Password es obligatorio' })

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export const DraftExpenseSchema = z.object({
    name: z.string().min(1, { message: 'El nombre del gasto es obligatorio' }),
    amount: z.coerce.number({ message: 'La cantidad no es válida' }).min(1, { message: 'La cantidad no es válida' })
})

export const updatePasswordSchema = z.object({
    current_password: z.string().min(1, {message: 'El password no puede estar vacio'}),
    password: z.string().min(6, { message: 'El password nuevo debe tener al menos 6 caracteres' }),
    password_confirmation: z.string()
}).refine((data)=> data.password === data.password_confirmation, {
    message: 'Los passwords son distintos',
    path: ['password_confirmation']
});


export const ExpenseAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    budgetId: z.number(),
})

export const BudgetAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    expenses: z.array(ExpenseAPIResponseSchema)
})

export const ProfileFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'Tu Nombre no puede ir vacio' }),
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
})

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema.omit({expenses: true}))


export type User = z.infer<typeof UserSchema>

export type Budget = z.infer<typeof BudgetAPIResponseSchema>
export type DraftExpense = z.infer<typeof DraftExpenseSchema>
export type Expense = z.infer<typeof ExpenseAPIResponseSchema>