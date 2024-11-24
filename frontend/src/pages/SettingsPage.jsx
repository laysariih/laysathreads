import { Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

export const SettingsPage = () => {
	const showToast = useShowToast();
	const logout = useLogout();

	const freezeAccount = async () => {
		if (!window.confirm("Tem certeza de que deseja congelar sua conta?")) return;

		try {
			const res = await fetch("/api/users/freeze", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.error) {
				return showToast("Error", data.error, "error");
			}
			if (data.success) {
				await logout();
				showToast("Success", "Sua conta foi congelada", "success");
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Text my={1} fontWeight={"bold"}>
			Bloquear sua conta
			</Text>
			<Text my={1}>Você pode desbloquear sua conta a qualquer momento fazendo login novamente.</Text>
			<Button size={"sm"} colorScheme='red' onClick={freezeAccount}>
				Bloquear 
			</Button>
		</>
	);
};
