"use client"

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { TECHNICAL_INTERVIEWS, NON_TECHNICAL_INTERVIEWS, EXPERIENCE_LEVELS, COMPANY_TYPES } from "@/constants/interviews";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    ENDED = "ENDED"
}


interface AgentProps {
    userName?: string;
}

const Agent = ({ userName = "User" }: AgentProps) => {
    const isSpeaking = true;
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const searchParams = useSearchParams();
    
    // Get interview parameters from URL
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const company = searchParams.get('company');
    
    // Find selected interview details
    const allInterviews = [...TECHNICAL_INTERVIEWS, ...NON_TECHNICAL_INTERVIEWS];
    const selectedInterview = allInterviews.find(interview => interview.id === category);
    const selectedLevel = EXPERIENCE_LEVELS.find(l => l.id === level);
    const selectedCompany = COMPANY_TYPES.find(c => c.id === company);
    
    // Dynamic messages based on selection
    const getCustomMessages = () => {
        if (!selectedInterview) {
            return ["Hello, welcome to your interview preparation session.", "Let's get started!"];
        }
        
        const interviewType = selectedInterview.name;
        const experienceLevel = selectedLevel?.name || "";
        const companyType = selectedCompany?.name || "";
        
        return [
            `Hello, welcome to your ${interviewType} interview preparation.`,
            `This session is tailored for ${experienceLevel} positions at ${companyType} companies.`,
            `Let's begin with some questions relevant to ${interviewType}. Are you ready?`
        ];
    };
    
    const messages = getCustomMessages();
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
                <div className="transcript-border flex justify-center">
                    <div className="transcript-content text-center">
                        <p key={lastMessage} className="">{lastMessage}</p>
                    </div>
                </div>
            )}
            
            <div className="w-full flex justify-center">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button className="btn-call">
                        {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.ENDED ? "Start Call" : "Connecting..."}
                    </button>
                ) : (
                    <button className="btn-stop-call">
                        End Call
                    </button>
                )}
            </div>
        </>
    );
};

export default Agent;