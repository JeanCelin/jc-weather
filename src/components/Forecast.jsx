import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Forecast.module.css";

export default function Forecast({ data }) {
  const itens = data.list;
  const today = new Date();
  const day = parseInt(today.getDate().toString().padStart(2, "0"));

  console.log(itens);

  const [itensForDays, setItensForDays] = useState({});
  let interator = 1;

  useEffect(() => {
    const groupedItems = {};

    itens.forEach((element) => {
      const elementTimestamp = element.dt;
      const elementDate = new Date(elementTimestamp * 1000);
      const elementDay = parseInt(
        elementDate.getDate().toString().padStart(2, "0")
      );

      if (!groupedItems[elementDay]) {
        groupedItems[elementDay] = [];
      }
      groupedItems[elementDay].push(element);
    });

    setItensForDays(groupedItems);
  }, [data]);

  useEffect(() => {
    console.log(itensForDays);
  }, [itensForDays]);
  return <></>;
}
