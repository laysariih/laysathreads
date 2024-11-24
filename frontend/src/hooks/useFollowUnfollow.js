import { useState } from "react";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const useFollowUnfollow = (user) => {
	const currentUser = useRecoilValue(userAtom);
	const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
	const [updating, setUpdating] = useState(false);
	const showToast = useShowToast();

	const handleFollowUnfollow = async () => {
		if (!currentUser) {
			showToast("Error", "Faça login para seguir", "error");
			return;
		}
		if (updating) return;

		setUpdating(true);
		try {
			const res = await fetch(`/api/users/follow/${user._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.error) {
				showToast("Ocorreu um erro", data.error, "error");
				return;
			}

			if (following) {
				showToast("Successo", `Parou de seguir ${user.name}`, "success");
				user.followers.pop(); // simular remoção de seguidores
			} else {
				showToast("Successo", `Seguiu ${user.name}`, "success");
				user.followers.push(currentUser?._id); // simular adição de seguidores
			}
			setFollowing(!following);

			console.log(data);
		} catch (error) {
			showToast("Ocorreu um erro", error, "error");
		} finally {
			setUpdating(false);
		}
	};

	return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;
