package proto

import "github.com/moovweb/tritium/constants"

func (obj *ScriptObject) Imports() []string {
	list := make([]string, 0)
	obj.Root.Iterate(func(ins *Instruction) {
		if ins.GetType() == constants.Instruction_IMPORT {
			list = append(list, ins.GetValue())
		}
		//println(*ins.Type)
	})
	return list
}

func (obj *ScriptObject) ImportInstructions() []*Instruction {
	list := make([]*Instruction, 0)
	obj.Root.Iterate(func(ins *Instruction) {
		if ins.GetType() == constants.Instruction_IMPORT {
			list = append(list, ins)
		}
		//println(*ins.Type)
	})
	return list
}
