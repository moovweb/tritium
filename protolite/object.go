package proto

import (
	"tritium/protoface"
)

func (obj *ScriptObject) Imports() []string {
	list := make([]string, 0)
	obj.Root.Iterate(func(ins2 protoface.Instruction) {
		ins := ins2.(*Instruction)
		if ins.GetType() == Instruction_IMPORT {
			list = append(list, ins.GetValue())
		}
		//println(*ins.Type)
	})
	return list
}
