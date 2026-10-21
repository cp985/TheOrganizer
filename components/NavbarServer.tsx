'use server'

import NavbarClient from "./NavbarClient";
import {auth} from "@/auth/auth"

export default async function NavbarServer() {
    const session = await auth()

    return <NavbarClient session={session} />;
}