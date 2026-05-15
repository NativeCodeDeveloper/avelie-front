"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppButton() {
    return (
        <FloatingWhatsApp
            phoneNumber="+56977283979"
            accountName="Avelie Centro Estetico"
            avatar="/avalielogo1.png"
            statusMessage=""
            chatMessage="Hola, gracias por contactar a Avelie. En que podemos ayudarte?"
            placeholder="Escribe tu mensaje..."
            notification
            notificationSound
        />
    );
}
