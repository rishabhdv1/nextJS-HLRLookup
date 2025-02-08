import Image from "next/image";
import styles from "./page.module.css";
import PhoneLookup from "@/components/PhoneLookup";

export default function Home() {
  return (
    <div>
      <PhoneLookup />
    </div>
  );
}
