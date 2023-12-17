declare module 'react-faq-component';

type Methods = "post" | "get" | "delete" | "put" | "patch" | 'delete';

interface ResponseProp<T = any> {
  status: boolean,
  message: string,
  data: T
}

interface AnyReduxState<T = any> {
  status?: boolean;
  message?: string | null;
  data?: T | null;
  loading?: "true" | "false" | "done";
}