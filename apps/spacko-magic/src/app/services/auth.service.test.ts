import * as auth_service from "./auth.service"
import * as card_service from "./card.service"
import * as player_service from "./player.service"

describe("checkSession", () => {
    let inst: any
    let inst2: any
    let inst3: any

    beforeEach(() => {
        inst = new card_service.CardService()
        inst2 = new player_service.PlayerService()
        inst3 = new auth_service.AuthService(undefined, inst, inst2, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst3.checkSession(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst3.checkSession(true)
        }
    
        expect(callFunction).not.toThrow()
    })
})

describe("register", () => {
    let inst: any
    let inst2: any
    let inst3: any

    beforeEach(() => {
        inst = new card_service.CardService()
        inst2 = new player_service.PlayerService()
        inst3 = new auth_service.AuthService(undefined, inst, inst2, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst3.register({ name: "Jean-Philippe", password: "NoWiFi4you" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst3.register({ name: "Anas", password: "!Lov3MyPianoPony" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst3.register({ name: "Jean-Philippe", password: "$p3onyycat" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst3.register({ name: "Anas", password: "accessdenied4u" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst3.register({ name: "Michael", password: "!Lov3MyPianoPony" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst3.register({ name: "", password: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

describe("login", () => {
    let inst: any
    let inst2: any
    let inst3: any

    beforeEach(() => {
        inst = new card_service.CardService()
        inst2 = new player_service.PlayerService()
        inst3 = new auth_service.AuthService(undefined, inst, inst2, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst3.login({ name: "Pierre Edouard", password: "!Lov3MyPianoPony" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst3.login({ name: "Jean-Philippe", password: "!Lov3MyPianoPony" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst3.login({ name: "George", password: "$p3onyycat" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst3.login({ name: "Pierre Edouard", password: "$p3onyycat" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst3.login({ name: "Anas", password: "NoWiFi4you" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst3.login({ name: "", password: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("logOut", () => {
    let inst: any
    let inst2: any
    let inst3: any

    beforeEach(() => {
        inst = new card_service.CardService()
        inst2 = new player_service.PlayerService()
        inst3 = new auth_service.AuthService(undefined, inst, inst2, undefined, undefined)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst3.logOut()
        }
    
        expect(callFunction).not.toThrow()
    })
})
