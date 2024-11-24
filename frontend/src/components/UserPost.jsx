import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import UserPost from "../components/UserPost";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

// Lista de usernames para os quais o ícone de verificação deve ser exibido
const VERIFIED_USERNAMES = ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8']; // coloque aqui o nome de usuário, vinculado no Banco de Dados (Ele irá colocar o emblema de verificado para o usuário) (EM BREVE VIA BANCO DE DADOS / PAINEL ADMIN)

const UserPage = () => {
    const { user, loading } = useGetUserProfile();
    const { username } = useParams();
    const showToast = useShowToast();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [fetchingPosts, setFetchingPosts] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            if (!user) return;
            setFetchingPosts(true);
            try {
                const res = await fetch(`/api/posts/user/${username}`);
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setPosts([]);
            } finally {
                setFetchingPosts(false);
            }
        };

        getPosts();
    }, [username, showToast, setPosts, user]);

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>Usuário não encontrado</h1>;

    return (
        <>
            <UserHeader user={user} />

            {fetchingPosts ? (
                <Flex justifyContent={"center"} my={12}>
                    <Spinner size={"xl"} />
                </Flex>
            ) : posts.length === 0 ? (
                <h1>O usuário não possui publicações</h1>
            ) : (
                posts.map((post) => (
                    <UserPost
                        key={post._id}
                        postImg={post.img}
                        postTitle={post.text}
                        likes={post.likes}
                        replies={post.replies.length}
                        username={user.username}
                        verifiedUsernames={VERIFIED_USERNAMES} // Passe a lista de usernames verificados
                    />
                ))
            )}
        </>
    );
};

export default UserPage;
