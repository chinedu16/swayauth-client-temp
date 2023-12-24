declare module 'react-faq-component';

type Methods = "post" | "get" | "delete" | "put" | "patch" | 'delete';

interface ResponseProp<T = any> {
  status: boolean,
  message: string,
  data: T
}

type loading = "true" | "false" | "done";

interface AnyReduxState<T = any> {
  loading?: loading
  status?: boolean;
  message?: string | null;
  data?: T | null;
}