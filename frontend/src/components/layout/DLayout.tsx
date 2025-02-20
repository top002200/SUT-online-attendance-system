import React from "react";
import {
  Box,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";
import MobileNav from "./MobileNav";
import { Outlet } from "react-router-dom";

export default function DLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function removeQuotes(str: any) {
    return str.replace(/"/g, "");
  }
  const teacherId =
    removeQuotes(localStorage.getItem("teacher_id")) ?? undefined;

  return (
    <Box minH="100vh" bg={"rgb(242, 101, 34)"}>
      <Box display={{ base: "none", md: "block" }}>
        <SidebarContent onClose={onClose} teacherId={teacherId} />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} teacherId={teacherId} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} p="4" bg={"gray.100"} h={"100vh"}>
        <MobileNav onOpen={onOpen} />
        <Outlet />
      </Box>
    </Box>
  );
}
