import { Avatar, Divider, Flex, Text, Image } from "@chakra-ui/react";

// Lista de usernames para os quais o ícone de verificação deve ser exibido
const VERIFIED_USERNAMES = ['luischavoso.7'];

const Comment = ({ reply, lastReply }) => {
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                {/* Exibe a imagem de perfil do usuário */}
                <Avatar src={reply.userProfilePic} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Flex alignItems={"center"}>
                            <Text fontSize='sm' fontWeight='bold'>
                                {reply.username}
                            </Text>
                            {/* Verifica se o username está na lista de verificados */}
                            {VERIFIED_USERNAMES.includes(reply.username) && (
                                <Image src='/verified.png' w={4} h={4} ml={1} />
                            )}
                        </Flex>
                    </Flex>
                    <Text>{reply.text}</Text>
                </Flex>
            </Flex>
            {!lastReply ? <Divider /> : null}
        </>
    );
};

export default Comment;
