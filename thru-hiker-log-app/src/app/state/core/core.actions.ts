import { createAction } from "@ngrx/store";

export const enableSpinner = createAction('[Core] Enable spinner');
export const disableSpinner = createAction('[Core] Disable spinner');