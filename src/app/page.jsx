import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import Text from "@/components/Text";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">
      {/* <Text/>
      <p>{JSON.stringify(session)}</p> */}
      <section>
        <Banner />
      </section>
      <section>
        <Products />
      </section>
    </div>
  );
}
