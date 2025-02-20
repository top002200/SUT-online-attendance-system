import React, { useEffect, useState } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Text,
  BoxProps,
  Spinner,
  Alert,
  AlertIcon,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { LuGraduationCap } from "react-icons/lu";
import { getSubjectsByTid } from "../../services/api";
import { Subject } from "../../interface/ITeacherSubject";

interface SidebarProps extends BoxProps {
  onClose: () => void;
  teacherId: string;
}

const SidebarContent = ({ onClose, teacherId, ...rest }: SidebarProps) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjectsByTid({ teacher_id: teacherId });
        setSubjects(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [teacherId]);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box
      transition="3s ease"
      bg={"white"}
      boxShadow={{ base: "none", md: "xl" }}
      w={{ base: "full", md: "260px" }}
      pos="fixed"
      h="full"
      className="no-copy-no-select"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between">
        <img
          src={window.location.origin + "/assets/SUT_logo_v_en_bl.png"}
          alt="logo"
          width={90}
          className="object-cover mx-auto  md:mx-auto mt-2 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          position={"absolute"}
          right={4}
          fontSize={"2xl"}
          outline={"1px solid black"}
          onClick={onClose}
        />
      </Flex>
      <Text
        fontWeight="bolder"
        marginTop={8}
        marginLeft={4}
        marginBottom={5}
        fontSize={"xl"}
      >
        วิชาที่สอน
      </Text>
      <VStack spacing={4} align="start" px={4}>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} height="20px" width="full" />
            ))
          : subjects.map((subject) => (
              <NavItem
                key={subject.subject_id}
                fontSize={"0.8rem"}
                fontWeight={"medium"}
                icon={LuGraduationCap}
                href={`/subject/${subject.subject_id}`}
                _active={
                  location.pathname === `/subject/${subject.subject_id}`
                    ? "active"
                    : ""
                }
              >
                {subject.subject_id} {subject.subject_name}
              </NavItem>
            ))}
      </VStack>
    </Box>
  );
};

export default SidebarContent;
