import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  cache: false,
  testEnvironment: "jsdom",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  setupFiles: ["<rootDir>/web/__setup_files__/htmlSetup.ts"],
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
};

export default jestConfig;
