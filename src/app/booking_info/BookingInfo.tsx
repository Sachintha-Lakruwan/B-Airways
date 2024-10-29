import React from "react";
import { BookingInfoProps } from "./page";

export default function BookingInfo({
  details,
}: {
  details: BookingInfoProps;
}) {
  console.log(details);
  return <div>details</div>;
}
