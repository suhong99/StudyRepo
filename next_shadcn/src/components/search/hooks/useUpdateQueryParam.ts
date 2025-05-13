import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const useUpdateQueryParam = () => {
	const router = useRouter();

	const updateQueryParam = useCallback(
		(key: string, value: string | null) => {
			const currentParams = new URLSearchParams(window.location.search);

			if (value) {
				currentParams.set(key, value);
			} else {
				currentParams.delete(key);
			}

			router.push(`?${currentParams.toString()}`, { scroll: false });
		},
		[router],
	);

	return updateQueryParam;
};

export default useUpdateQueryParam;
