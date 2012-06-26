package proto

import (
	pb "code.google.com/p/goprotobuf/proto"
)

func (obj *ScriptObject) Imports() []string {
	list := make([]string, 0)
	obj.Root.Iterate(func(ins *Instruction) {
		if *ins.Type == Instruction_IMPORT {
			list = append(list, pb.GetString(ins.Value))
		}
		//println(*ins.Type)
	})
	return list
}
