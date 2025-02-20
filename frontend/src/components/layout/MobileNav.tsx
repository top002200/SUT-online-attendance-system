import {
  Flex,
  IconButton,
  Avatar,
  HStack,
  VStack,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  FlexProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { signOut } = useAuth();

  function removeQuotes(str: any) {
    return str ? str.replace(/"/g, "") : "";
  }

  const user = {
    id: removeQuotes(localStorage.getItem("teacher_id")),
    firstname: removeQuotes(localStorage.getItem("firstname")),
    lastname: removeQuotes(localStorage.getItem("lastname")),
    email: removeQuotes(localStorage.getItem("email")),
    phone_number: removeQuotes(localStorage.getItem("phone_number")),
    profile_pic: removeQuotes(localStorage.getItem("profile_pic")),
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"rgb(242, 101, 34)"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="lg"
        fontFamily="monospace"
        fontWeight="bold"
        color={"white"}
      >
        SUT Attendence
      </Text>

      <HStack spacing={{ base: "0", md: "6" }} zIndex={10}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    user.profile_pic
                      ? user.profile_pic
                      : "https://www.gravatar.com/avatar/000?d=mp"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color={"white"}>
                    {user.firstname} {user.lastname}
                  </Text>
                  <Text fontSize="xs">{user.email}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={"white"} borderColor={"gray.200"}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
