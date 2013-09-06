package whale

import (
	"tritium/protoface"
)

type Position int

const (
	TOP = iota
	BOTTOM
	BEFORE
	AFTER
)

var Positions = map[string]Position{
	"top":    TOP,
	"bottom": BOTTOM,
	"before": BEFORE,
	"after":  AFTER,
	"above":  BEFORE,
	"below":  AFTER,
}

type YieldBlock struct {
	Ins  protoface.Instruction
	Vars map[string]interface{}
	Filename string
}

type Function struct {
	Name string
	protoface.Function
}

type Scope struct {
	Value interface{}
	Index int
}