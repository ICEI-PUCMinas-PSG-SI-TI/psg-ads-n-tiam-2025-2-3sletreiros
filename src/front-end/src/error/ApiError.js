export function handleError(error) {
    if (error.response) {
        return {
            type: 'response',
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message || 'Erro interno. Por favor, tente em alguns instantes.'
        }
    }
    else if (error.request) {
        return {
            type: 'request',
            message: 'Erro ao processar solicitação. Verifique sua conexão e tente novamente.'
        }
    } 
    else {
        return {
            type: "general",
            message: error.message,
        }
    }
}