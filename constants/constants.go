package constants 

const (
	Instruction_BLOCK         int32 = 0
	Instruction_FUNCTION_CALL int32 = 1
	Instruction_IMPORT        int32 = 2
	Instruction_TEXT          int32 = 3
	Instruction_LOCAL_VAR     int32 = 4
	Instruction_POSITION      int32 = 5
	Instruction_COMMENT       int32 = 6
)

var Instruction_InstructionType_name = map[int32]string{
	0: "BLOCK",
	1: "FUNCTION_CALL",
	2: "IMPORT",
	3: "TEXT",
	4: "LOCAL_VAR",
	5: "POSITION",
	6: "COMMENT",
}
var Instruction_InstructionType_value = map[string]int32{
	"BLOCK":         0,
	"FUNCTION_CALL": 1,
	"IMPORT":        2,
	"TEXT":          3,
	"LOCAL_VAR":     4,
	"POSITION":      5,
	"COMMENT":       6,
}


const (
	RewriteRule_BIDIRECTIONAL     int32 = 0
	RewriteRule_PROXY_TO_UPSTREAM int32 = 1
	RewriteRule_UPSTREAM_TO_PROXY int32 = 2
)

var RewriteRule_RuleDirection_name = map[int32]string{
	0: "BIDIRECTIONAL",
	1: "PROXY_TO_UPSTREAM",
	2: "UPSTREAM_TO_PROXY",
}
var RewriteRule_RuleDirection_value = map[string]int32{
	"BIDIRECTIONAL":     0,
	"PROXY_TO_UPSTREAM": 1,
	"UPSTREAM_TO_PROXY": 2,
}