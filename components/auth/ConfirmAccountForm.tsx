"use client";

import { confirmAccount } from "@/actions/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useRouter } from "next/navigation";
import React, {
	startTransition,
	useActionState,
	useEffect,
	useState,
} from "react";

import { toast } from "react-toastify";

export default function ConfirmAccountForm() {
	const router = useRouter();

	const [isComplete, setIscomplete] = useState(false);

	const [token, setToken] = useState("");

	const confirmAccountWithToken = confirmAccount.bind(null, String(token));

	const [state, dispatch] = useActionState(confirmAccountWithToken, {
		errors: [],
		success: "",
	});

	useEffect(() => {
		if (isComplete) {
			startTransition(() => {
				dispatch();
			});
		}
	}, [isComplete, dispatch]);

	useEffect(() => {
		if (state.errors) {
			state.errors.forEach((error) => {
				toast.error(error);
			});
		}
		if (state.success) {
			toast.success(state.success, {
				onClose: () => { 
					router.push('/auth/login')
				},
			});
		}
	}, [state]);

	const handleChange = (token: string) => {
		setToken(token);
	};

	const handleComplete = () => {
		setIscomplete(true);
	};

	return (
		<>
			<div className="flex justify-center gap-5 my-10">
				<PinInput
					value={token}
					onChange={handleChange}
					onComplete={handleComplete}
				>
					<PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center" />
					<PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center" />
					<PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center" />
					<PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center" />
					<PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center" />
					<PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg placeholder-white text-center" />
				</PinInput>
			</div>
		</>
	);
}
