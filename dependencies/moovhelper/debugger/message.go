package debugger

const (
	MoovXCmdSetBreakpoint = "CmdSetBreakpoint"
	MoovXCmdUnsetBreakpoint = "CmdUnsetBreakpoint"

	MoovXCmdContinue = "CmdContinue"
	MoovXCmdStep = "CmdStep"

	MoovXCmdDisable = "CmdDisableBP"
	MoovXCmdEnable = "CmdEnableBP"

	MoovXCmdReplayOn = "CmdReplayOn"
	MoovXCmdReplayOff = "CmdReplayOff"
	MoovXCmdReplayClear = "CmdReplayClear"

	MoovXCmdListBreakpoints = "CmdListBreakpoints"

	MoovXCmdGetScript = "CmdGetScript"

	MoovXCmdSelectorInfoOn = "CmdSelectorInfoOn"
	MoovXCmdSelectorInfoOff = "CmdSelectorInfoOff"

	MoovXCmdLiveReloadTsOn = "CmdLiveReloadTsOn"
	MoovXCmdLiveReloadTsOff = "CmdLiveReloadTsOff"
	MoovXCmdLiveReloadCssOn = "CmdLiveReloadCssOn"
	MoovXCmdLiveReloadCssOff = "CmdLiveReloadCssOff"
)

const (
	MoovXNotfBreakpointSet = "NotfBreakpointSet"
	MoovXNotfBreakpointUnset = "NotfBreakpointUnset"
	MoovXNotfBreakpointInvalid = "NotfBreakpointInvalid"

	MoovXNotfStopAt = "NotfStopAt"
	MoovXNotfTritiumChanged = "NotfTritiumChanged"

	MoovXNotfTritiumScriptGot = "NotfTritiumScriptGot"
)

type BreakpointPayload struct {
	Filename string
	Linenumber int
}

type StopAtPayload struct {
	Filename string
	Linenumber int
	Env map[string]string
	CurrentScope string
	CurrentDoc string
}

type ListBreakpointsPayload struct {
	Filename string
}

type GetScriptPayload struct {
	Filename string
}

type ScriptPayload struct {
	Filename string
	Content string
}
