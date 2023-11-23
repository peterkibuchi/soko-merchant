import { ApiAlert } from "~/components/ui/api-alert";
import { useOrigin } from "~/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
  storeId: string;
}

export function ApiList({ entityName, entityIdName, storeId }: ApiListProps) {
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${storeId}`;

  return (
    <div>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  );
}
