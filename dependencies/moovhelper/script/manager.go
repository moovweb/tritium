package script

import "sync"
import "time"
import "fmt"
import "path/filepath"
import "io/ioutil"

type ScriptManager interface {
	ImportScript(string, string, string, int) *ScriptInfo
	ImportScriptDone(string, string, string, int) *ScriptInfo
	ListScripts() []string
	GetScript(string) string
	Reset()
}

type ScriptInfo struct {
	Filename string
	Url string
	Importer string
	ImporterLineNum int
	ImportTime time.Time
	ImportDuration time.Duration
}

type ProjectScripts struct {
	ps map[string]*ScriptInfo
	projectDir string
	sync.RWMutex
}

func NewProjectScripts(projectDir string) *ProjectScripts {
	ps := &ProjectScripts{ps: make(map[string]*ScriptInfo), projectDir: projectDir}
	return ps
}

func (ps *ProjectScripts) ImportScript(reqId, scriptName, importerName string, importerLineNum int) *ScriptInfo {
	ps.RLock()
	defer ps.RUnlock()
	si := &ScriptInfo{
				Filename: scriptName,
				Url: "/_moovweb_local_scripts_/"+scriptName,
				Importer: importerName,
				ImporterLineNum: importerLineNum,
				ImportTime: time.Now(),
			}
	key := fmt.Sprintf("%s:%s:%d", scriptName, importerName, importerLineNum)
	ps.ps[key] = si
	return si
}

func (ps *ProjectScripts) ImportScriptDone(reqId, scriptName, importerName string, importerLineNum int) *ScriptInfo {
	key := fmt.Sprintf("%s:%s:%d", scriptName, importerName, importerLineNum)
	ps.RLock()
	defer ps.RUnlock()
	if si, ok := ps.ps[key]; ok {
		si.ImportDuration = time.Since(si.ImportTime)
		return si
	}
	return nil
}

func (ps *ProjectScripts) ListScripts() []string {
	scriptNames := make([]string, 0, 4)
	ps.RLock()
	defer ps.RUnlock()
	for _, si := range ps.ps {
		scriptNames = append(scriptNames, si.Filename)
	}
	return scriptNames
}

func (ps *ProjectScripts) Reset() {
	ps.Lock()
	defer ps.Unlock()
	ps.ps = make(map[string]*ScriptInfo)
}

func (ps *ProjectScripts) GetScript(filename string) string {
	fullpath := filepath.Join(ps.projectDir, filename)
	data, err := ioutil.ReadFile(fullpath)
	if err != nil {
		return err.Error()
	}
	return string(data)
}
