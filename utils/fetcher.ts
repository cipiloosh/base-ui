const fetcher = (apiRoute: string) => () =>
    fetch(apiRoute).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Something went wrong here');
        }
    });

export default fetcher;
