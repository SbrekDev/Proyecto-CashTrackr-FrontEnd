import { verifySession } from "@/src/auth/dal";
import getToken from "@/src/auth/token";

export async function GET(
    request: Request,
    { params }: { params: { budgetId: string; expenseId: string } }
) {
    // Verifica la sesión del usuario
    await verifySession();

    // Obtiene el token para la autorización
    const token = await getToken();

    // Construye la URL
    const url = `${process.env.API_URL}/budgets/${params.budgetId}/expenses/${params.expenseId}`;

    // Realiza la solicitud a la API
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await req.json();

    if (!req.ok) {
        console.error(json.error);
        return new Response(JSON.stringify({ error: json.error }), { status: 403 });
    }

    return new Response(JSON.stringify(json), { status: 200 });
}
