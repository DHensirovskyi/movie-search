import { Center, Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Center style={{ height: '80vh' }}>
      <Loader color="red" type="dots" size="xl" />
    </Center>
  );
}