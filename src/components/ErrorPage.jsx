import { useRouteError } from "react-router-dom";

function ErrorPage(){
    const err = useRouteError();
    return(
        <div className="text-center">
            <h1>Oops.. Something went wrong</h1>
            <h2>{err?.status}: {err?.statusText}</h2>
        </div>
    )
}

export default ErrorPage;