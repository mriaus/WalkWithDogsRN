export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}

// Para casos de uso sin parámetros de entrada
export interface IUseCaseNoInput<TOutput> {
  execute(): Promise<TOutput>;
}
