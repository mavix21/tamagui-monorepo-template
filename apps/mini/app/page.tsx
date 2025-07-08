"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import {
  useAddFrame,
  useMiniKit,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";

import { Button, Header, YStack } from "@myapp/ui";

import { Features, Home, Icon } from "./components/DemoComponents";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button variant="outlined" icon={<Icon name="plus" size="sm" />}>
          {/* onClick={handleAddFrame} */}
          {/* className="p-4 text-[var(--app-accent)]" */}
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex animate-fade-out items-center space-x-1 text-sm font-medium text-[#0052FF]">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <YStack
      flex={1}
      items="center"
      minH="100vh"
      px="$4"
      py="$3"
      marginInline="auto"
      width="100%"
    >
      <Header
        mb="$3"
        justify="space-between"
        flexDirection="column"
        items="center"
        height="$11"
        className="h-11"
      >
        <div>
          <div className="flex items-center space-x-2">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pb-2 pt-3" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
        <div>{saveFrameButton}</div>
      </Header>
      <main className="flex-1">
        {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
        {activeTab === "features" && <Features setActiveTab={setActiveTab} />}
      </main>
      <footer className="mt-2 flex justify-center pt-4">
        <Button
          variant="outlined"
          size="$4"
          className="text-xs text-[var(--ock-text-foreground-muted)]"
          icon={<Icon name="plus" size="sm" />}
        >
          {/* onClick={() => openUrl("https://base.org/builders/minikit")} */}
          Built on Base with MiniKit
        </Button>
      </footer>
    </YStack>
  );
}
