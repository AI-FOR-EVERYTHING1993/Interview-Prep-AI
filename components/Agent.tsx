"use client"

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { VapiService } from "@/lib/vapi";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    ENDED = "ENDED"
}

interface AgentProps {
    userName?: string;
    interviewData?: {
        role: string;
        level: string;
        techstack: string[];
    };
}

const Agent = ({ userName = "User", interviewData }: AgentProps) => {
    const isSpeaking = true;
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [currentCallId, setCurrentCallId] = useState<string | null>(null);
    const [messages, setMessages] = useState<string[]>([
        "Hello, welcome to your interview preparation session.",
        "I'll be conducting your interview today.",
        "Are you ready to begin?"
    ]);

    const startCall = async () => {
        if (!interviewData) return;
        
        setCallStatus(CallStatus.CONNECTING);
        
        try {
            const vapi = new VapiService();
            const call = await vapi.createCall(interviewData);
            
            setCurrentCallId(call.id);
            setCallStatus(CallStatus.ACTIVE);
            
            setMessages([
                `Starting your ${interviewData.role} interview...`,
                `Focus areas: ${interviewData.techstack.join(', ')}`,
                "Good luck!"
            ]);
        } catch (error) {
            console.error('Failed to start call:', error);
            setCallStatus(CallStatus.INACTIVE);
        }
    };

    const endCall = async () => {
        if (!currentCallId) return;
        
        try {
            const vapi = new VapiService();
            await vapi.endCall(currentCallId);
            
            setCallStatus(CallStatus.ENDED);
            setCurrentCallId(null);
            
            setMessages([
                "Interview completed!",
                "Thank you for participating.",
                "You'll receive feedback shortly."
            ]);
        } catch (error) {
            console.error('Failed to end call:', error);
        }
    };

    const lastMessage = messages[messages.length - 1];

    
    return (
        <>
            <div className="call-view"> 
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image 
                            src="/ai-avatar.png" 
                            alt="Vapi Interviewer Avatar"
                            width={66}
                            height={54}
                            className="object-cover"/>
                        {isSpeaking && <span className="animate-speak"></span>}
                    </div>
                    <h3>Partner AI Interviewer</h3>
                </div>

                <div className="card-border">
                    <div className="card-content">
                        <Image 
                            src="/user-avatar.png" 
                            alt="user avatar"
                            width={540}
                            height={540}
                            className="rounded-full object-cover size-[120px]"/>
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript-content">
                        <p key={lastMessage} className={cn("transition-opacity duration 500 opacity-0", "animate-fadeIn opacity-100")}>{lastMessage}</p>
                    </div>
                </div>
            )}
            
            <div className="w-full justify-center">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button 
                        className="btn-call"
                        onClick={startCall}
                        disabled={callStatus === CallStatus.CONNECTING}
                    >
                        {callStatus === CallStatus.INACTIVE ? "Start Interview" : 
                         callStatus === CallStatus.CONNECTING ? "Connecting..." : "Start Call"}
                    </button>
                ) : (
                    <button 
                        className="btn-stop-call"
                        onClick={endCall}
                    >
                        End Interview
                    </button>
                )}
            </div>
        </>
    );
};

export default Agent;