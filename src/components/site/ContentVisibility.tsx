import type { ReactNode } from "react";
import { useSetting } from "../../lib/editable-settings";
export function ContentVisibility({id,children}:{id:string;children:ReactNode}) {
  return useSetting(id)==="false"?null:<>{children}</>;
}
