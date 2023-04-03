import { useParams } from "react-router-dom";

export default function useGroupId() {
  return Number(useParams().groupId)
}
