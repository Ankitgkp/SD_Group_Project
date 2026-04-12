import {describe,it,expect} from "vitest";
import {validateEnv} from "../../../backend/src/config/env.config"


describe("Environment Validation", ()=>{

    it("should throw and error is DATABASE_URL is missing",()=>{
        delete process.env.DATABASE_URL;

        expect(()=>validateEnv()).toThrow(
            "Missing required environment variable: DATABASE_URL"
        )
    })

    it("should pass if DATABASE_URL exists",()=>{

        process.env.DATABASE_URL = "abc";

        expect(()=>validateEnv()).not.toThrow()
    })
})