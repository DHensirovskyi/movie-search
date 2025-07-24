import { Skeleton, Group, Stack } from '@mantine/core';

export function MovieRowSkeleton() {
  return (
    <Stack mb="xl">
      <Skeleton height={344} width={256} mb="md" /> 
      <Group grow preventGrowOverflow={false} wrap="nowrap">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} height={250} width={180} radius="md" />
        ))}
      </Group>
    </Stack>
  );
}