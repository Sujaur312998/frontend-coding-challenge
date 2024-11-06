import { GetServerSideProps } from "next";
import { BackToHome } from "@/components/backToHome/backToHome";

interface UserAgentProps {
  userAgent: string;
}

export const UserAgent = ({ userAgent }: UserAgentProps) => {
  console.log(userAgent);
  
  return (
    <div>
      <BackToHome />
      <div className="flex font-mono font-semibold text-sm">
        <div className="border p-2">UserAgent</div>
        <div className="border p-2">{userAgent}</div>
      </div>
    </div>
  );
};

// This function is executed on the server side before rendering the page
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = req 
  return {
    props: {
      userAgent,
    },
  };
};

export default UserAgent;
