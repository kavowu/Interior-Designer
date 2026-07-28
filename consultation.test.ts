import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

// Mock the database module so tests run without a real MySQL connection.
vi.mock("./db", () => ({
  insertConsultation: vi.fn(),
  listConsultations: vi.fn(),
}));

// Import after mock so the mocked versions are used.
import { insertConsultation, listConsultations } from "./db";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAuthedContext(): TrpcContext {
  const user: User = {
    id: 1,
    openId: "test-admin",
    email: "admin@wetop.com",
    name: "Admin",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const validInput = {
  name: "王小明",
  phone: "0912-345-678",
  email: "test@example.com",
  propertyType: "新成屋",
  budget: "50-100 萬",
  painPoints: "室內晾衣霉味,鞋櫃異味",
  message: "希望規劃全戶淨化",
};

describe("consultation.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("1. accepts valid input and returns success true", async () => {
    vi.mocked(insertConsultation).mockResolvedValue({} as never);
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.consultation.submit(validInput);
    expect(result).toEqual({ success: true });
  });

  it("2. rejects empty name", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.consultation.submit({ ...validInput, name: "" })
    ).rejects.toThrow();
  });

  it("3. rejects empty phone", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.consultation.submit({ ...validInput, phone: "" })
    ).rejects.toThrow();
  });

  it("4. rejects invalid email format", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.consultation.submit({ ...validInput, email: "not-an-email" })
    ).rejects.toThrow();
  });

  it("5. accepts empty optional email string", async () => {
    vi.mocked(insertConsultation).mockResolvedValue({} as never);
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.consultation.submit({
      ...validInput,
      email: "",
    });
    expect(result).toEqual({ success: true });
  });

  it("6. passes trimmed data to insertConsultation", async () => {
    vi.mocked(insertConsultation).mockResolvedValue({} as never);
    const caller = appRouter.createCaller(createPublicContext());
    await caller.consultation.submit(validInput);
    expect(insertConsultation).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "王小明",
        phone: "0912-345-678",
        email: "test@example.com",
        propertyType: "新成屋",
        budget: "50-100 萬",
        painPoints: "室內晾衣霉味,鞋櫃異味",
        message: "希望規劃全戶淨化",
      })
    );
  });

  it("7. returns success false when database is unavailable", async () => {
    vi.mocked(insertConsultation).mockResolvedValue(null as never);
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.consultation.submit(validInput);
    expect(result).toEqual({ success: false, error: "Database unavailable" });
  });
});

describe("consultation.list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requires authentication (rejects unauthenticated callers)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.consultation.list()).rejects.toThrow();
  });

  it("returns consultation list for authenticated users", async () => {
    const mockData = [
      {
        id: 1,
        name: "王小明",
        phone: "0912-345-678",
        email: "test@example.com",
        propertyType: "新成屋",
        budget: "50-100 萬",
        painPoints: "室內晾衣霉味",
        message: "測試",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    vi.mocked(listConsultations).mockResolvedValue(mockData as never);
    const caller = appRouter.createCaller(createAuthedContext());
    const result = await caller.consultation.list();
    expect(result).toEqual(mockData);
  });
});
