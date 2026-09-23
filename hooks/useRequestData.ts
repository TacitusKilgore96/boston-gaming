"use client"

import { useCallback, useState } from 'react'

type RequestOptions = {
    // Ekstra oplysninger, som kan bruges når API-kaldet sendes.
    body?: unknown;
    headers?: Record<string, string>;
    params?: Record<string, string | number | undefined>;
    apiKey?: string;
};

export default function useRequestData() {
    // Hooken samler alt, som en komponent skal bruge under et API-kald.
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState(false);

    // T kaldes en generisk type. Den gør det muligt at fortælle TypeScript,
    // hvilken type data API'et forventes at returnere.
    const makeRequest = useCallback(async <T = unknown>(
        url: string,
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
        options: RequestOptions = {}
    ): Promise<T | null> => {
        // Henter værdierne fra options og bruger standardværdier, hvis de mangler.
        const { body = null, headers = {}, params = {}, apiKey } = options;
        const requestUrl = new URL(url, process.env.NEXT_PUBLIC_API_URL || "http://localhost:5039");

        // Gør f.eks. { game: "chess" } til ?game=chess i URL'en.
        Object.entries(params).forEach(([key, value]) => value !== undefined && requestUrl.searchParams.set(key, String(value)));

        // Komponenten kan vise en loading-indikator, mens requesten kører.
        setIsLoading(true);
        setError(false);

        try {
            // Sender requesten til API'et med fetch, som allerede findes i Next.js.
            const response = await fetch(requestUrl, {
                method,
                headers: {
                    ...headers,
                    // Tilføjer login/token, hvis API'et kræver godkendelse.
                    ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
                    ...(body && !(body instanceof FormData) && typeof body !== "string"
                        ? { "Content-Type": "application/json" }
                        : {}),
                },
                // JavaScript-objekter omdannes til JSON før de sendes.
                body: body === null ? undefined : body instanceof FormData || typeof body === "string"
                    ? body
                    : JSON.stringify(body),
            });

            // fetch kaster ikke automatisk fejl ved f.eks. 404 eller 500.
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            // Læser JSON-svaret og gemmer det, så komponenten kan bruge dataene.
            const responseData = response.status === 204 ? null : await response.json();
            setData(responseData);
            return responseData as T | null;
        } catch {
            // Ved netværksfejl eller API-fejl fjernes gamle data og error sættes til true.
            setError(true);
            setData(null);
            return null;
        } finally {
            // Kører altid, både efter succes og fejl, så loading stopper korrekt.
            setIsLoading(false);
        }
    }, []);

    // Gør funktionen og dens status tilgængelig for komponenten, der bruger hooken.
    return { makeRequest, data, isLoading, error };
}