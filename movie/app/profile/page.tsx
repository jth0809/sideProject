// pages/profile.tsx (Next.js)

import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface ProfileProps {
  username: string;
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context
) => {
  const res = await fetch("http://localhost:8080/api/profile", {
    headers: {
      Cookie: context.req.headers.cookie || "",
    },
  });

  if (res.status === 401) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const data = await res.json();

  return {
    props: {
      username: data.username,
    },
  };
};

const Profile: React.FC<ProfileProps> = ({ username }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.push("/");
  };

  return (
    <div>
      <h1>어서오세요, {username}.</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Profile;
