/**
 * Auth method interface
 */
export interface AuthMethod {
  /**
   * Auth method name
   */
  name: string;

  /**
   * Auth method login function
   */
  login: Function;
}
