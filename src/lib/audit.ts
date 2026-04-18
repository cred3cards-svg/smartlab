import { prisma } from "./db";
import { headers } from "next/headers";
import { auth } from "./auth";

export type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "STATUS_CHANGE" | "UPLOAD";

interface AuditParams {
  action: AuditAction;
  entityType: string;
  entityId?: string;
  oldDetails?: any;
  newDetails?: any;
  metadata?: any;
}

/**
 * Logs an administrative action to the AuditLog table.
 * Captures IP and User Agent automatically from headers.
 */
export async function logAudit(params: AuditParams) {
  try {
    const session = await auth();
    const headerList = await headers();
    
    const ipAddress = headerList.get("x-forwarded-for") || headerList.get("x-real-ip") || "unknown";
    const userAgent = headerList.get("user-agent") || "unknown";

    await prisma.auditLog.create({
      data: {
        userId: session?.user?.id || "anonymous",
        userEmail: session?.user?.email || "anonymous",
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        oldDetails: params.oldDetails ? JSON.parse(JSON.stringify(params.oldDetails)) : undefined,
        newDetails: params.newDetails ? JSON.parse(JSON.stringify(params.newDetails)) : undefined,
        ipAddress,
        userAgent,
        metadata: params.metadata,
      },
    });
  } catch (error) {
    console.error("Failed to log audit:", error);
    // We don't throw here to avoid breaking the main operation if logging fails
  }
}
